import { PDFDocument, PDFImage, PDFPage } from 'pdf-lib';
import { readFile, readFileSync } from 'fs'
import path from 'path';
import { PDFEntryValue } from '../models/pdf-generate.model';
import { PDFTemplate } from './pdf-generate.enum';

interface PDFData {
    entries: Array<PDFEntryValue>,
    pdfTemplate: PDFTemplate,
    signatures?: Array<SignaturePlotDataRaw>
}

interface SignaturePlotData {
    image: PDFImage,
    dimension: {
        width: number;
        height: number;
    },
    x: number,
    y: number,
}

interface SignaturePlotDataRaw {
    image: string,
    x: number,
    y: number
}

interface StartEnd {
    start: number;
    end?: number;
    page: number;
}
export interface ModifyPDFOptions {
    isMultiplePage?: boolean;
    startEndValuesPerPage?:  StartEnd[];
}

const drawText = (page: PDFPage, data: PDFEntryValue, height: number): void => {
    page.drawText(`${data.text}`, {
            x: data.x,
            y: height - data.y,
            size: data.size,
        });
};

const getPDFTemplate = (value: PDFTemplate): string => {
    return `${path.join(__dirname, '..', 'pdf', `${value}.pdf`)}`;
};

const embedImages = async (pdfDoc: PDFDocument, dataImages: Array<SignaturePlotDataRaw>) => {
    const array = [];
    if (dataImages) {
      for (const image of dataImages) {
        const pngUrl = image.image;

        const pngImage = await pdfDoc.embedPng(pngUrl);
  
        const pngDims = pngImage.scale(0.5);
        array.push({ image: pngImage, dimension: pngDims, x: image.x, y: image.y });
      }
    }
    return array;
}        

const createImage = (currentPage: PDFPage, signatureData: Array<SignaturePlotData>) => {
    // Get the width and height of the first page
    const { width, height } = currentPage.getSize();
    const defaultDimWidth = 40;
    const defaultDimHeight = 40;
    let index = 0;
    for (const signature of signatureData) {
      const dimWidth = defaultDimWidth;
      const dimheight = defaultDimHeight;
      currentPage.drawImage(signature.image, {
        x: signature.x,
        y: height - signature.y,
        width: signature.dimension.width - dimWidth,
        height: signature.dimension.height - dimheight,
      });
      index += 1;
    }
};

export const modifyPdf = (dataVal: PDFData, options?: ModifyPDFOptions): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = readFileSync(getPDFTemplate(dataVal.pdfTemplate));
            const arrayBuffer = new Uint8Array(data).buffer;
            
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();

            if (options?.isMultiplePage) {
                // If generating a multiple page pdf 
                if (!options?.startEndValuesPerPage) {
                    return reject(new Error(`'startEndValuesPerPage' value is required in generating multiple page`));
                }
                
                const pages = pdfDoc.getPages();

                for (const iterator of options.startEndValuesPerPage) {
                    const currentPage = pages[iterator.page - 1];
                    const { width, height } = currentPage.getSize();
                    const arrayLastIndex = iterator.end ? iterator.end + 1 : null;
                    const valueSlice = arrayLastIndex ? dataVal.entries.slice(iterator.start, arrayLastIndex + 1) :
                        dataVal.entries.slice(iterator.start);

                    for (const iterator of valueSlice) {
                        drawText(currentPage, iterator, height);
                    }
                }
            } else {
                // Single page pdf 
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize();

                for (const iterator of dataVal.entries) {
                    drawText(firstPage, iterator, height);
                }

                if (dataVal.signatures?.length) {
                    const signatures = await embedImages(pdfDoc, dataVal.signatures as Array<SignaturePlotDataRaw>);
                    createImage(firstPage, signatures);
                }
            }

            const qwe = await pdfDoc.saveAsBase64({ dataUri: true })
            resolve(qwe);
        } catch (error) {
             reject(error);
        }

        // readFile(getPDFTemplate(pdfTemplate), async (error, data) => {            
        //     if (error) { return reject(error) };
        //     const arrayBuffer = new Uint8Array(data).buffer;
            
        //     const pdfDoc = await PDFDocument.load(arrayBuffer);

        //     const pages = pdfDoc.getPages();
        //     const firstPage = pages[0];
        //     const { width, height } = firstPage.getSize();

        //     const sampleEntry: PDFEntryValue = { text: 'This text was added with JavaScript!', size: 50, x: 5, y: height / 2 + 300 }
        //     values.forEach((val) => {
        //         drawText(firstPage, val, height);
        //     });

        //     const qwe = await pdfDoc.saveAsBase64({ dataUri: true })
        //     resolve(qwe);
        // })
    })};



