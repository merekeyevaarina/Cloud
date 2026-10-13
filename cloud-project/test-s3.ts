
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3 } from "./src/shared/lib/s3";

async function main() {
    const result = await s3.send(new ListBucketsCommand({}));

    console.log("Подключение успешно!");
    console.log("Бакеты:", result.Buckets?.map((bucket) => bucket.Name));
}

main().catch((error) => {
    console.error("Ошибка подключения к SeaweedFS:");
    console.error(error);
    process.exitCode = 1;
});
