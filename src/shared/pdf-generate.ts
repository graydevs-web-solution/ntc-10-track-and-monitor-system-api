import { PDFDocument, PDFPage } from 'pdf-lib';
import { readFile, readFileSync } from 'fs'
import path from 'path';
import { PDFEntryValue } from '../models/pdf-generate.model';
import { PDFTemplate } from './pdf-generate.enum';


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

export const modifyPdf = (values: Array<PDFEntryValue>, pdfTemplate: PDFTemplate, options?: ModifyPDFOptions): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = readFileSync(getPDFTemplate(pdfTemplate));
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
                    const valueSlice = arrayLastIndex ? values.slice(iterator.start, arrayLastIndex + 1) :
                        values.slice(iterator.start);

                    for (const iterator of valueSlice) {
                        drawText(currentPage, iterator, height);
                    }
                }
            } else {
                // Single page pdf 
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize();

                for (const iterator of values) {
                    drawText(firstPage, iterator, height);
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



