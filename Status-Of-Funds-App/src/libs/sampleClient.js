import { S3Client } from "@aws-sdk/client-s3";
const REGION = "us-east-1";
const s3Client = new S3Client({ 
    region: REGION,
    credentials: {
        accessKeyId: "AKIAZK2NQISUKT3CI5MC",
        secretAccessKey: "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",
    } });
export { s3Client };