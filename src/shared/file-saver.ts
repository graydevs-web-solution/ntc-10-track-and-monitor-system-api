import { saveAs } from 'file-saver';

export const saveFile = (data: any) => {
    saveAs(data);
};