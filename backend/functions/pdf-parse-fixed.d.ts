declare module "pdf-parse-fixed" {
    import { Buffer } from "buffer";
    interface PDFInfo {
      numpages: number;
      numrender: number;
      info: Record<string, any>;
      metadata: any;
      version: string;
    }
  
    interface PDFData {
      text: string;
      info: PDFInfo;
      metadata: any;
      version: string;
      outline: any;
      formImage: any;
    }
  
    type PDFParse = (dataBuffer: Buffer | Uint8Array, options?: any) => Promise<PDFData>;
  
    const pdfParse: PDFParse;
    export default pdfParse;
  }
  