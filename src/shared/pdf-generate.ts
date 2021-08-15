import { PDFDocument, PDFPage } from 'pdf-lib';
import { readFile, readFileSync } from 'fs'
import path from 'path';
import { PDFEntryValue } from 'src/models/pdf-generate.model';
import { PDFTemplate } from './pdf-generate.enum';


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

export const modifyPdf = (values: Array<any>, pdfTemplate: PDFTemplate): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        readFile(getPDFTemplate(pdfTemplate), async (error, data) => {            
            if (error) { return reject(error) };
            const arrayBuffer = new Uint8Array(data).buffer;
            
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();

            const sampleEntry: PDFEntryValue = { text: 'This text was added with JavaScript!', size: 50, x: 5, y: height / 2 + 300 }
            values.forEach((val) => {
                drawText(firstPage, val, height);
            });

            const qwe = await pdfDoc.saveAsBase64({ dataUri: true })
            resolve(qwe);
        })
    })};



