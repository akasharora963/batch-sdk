
import { BatchProcessor } from "./service/BatchProcessor";
export async function getNativeBalances() {
    console.log("Processing----------");

    const bp = new BatchProcessor();

    const test = await bp.getNativeBalances(["0x3c5a809e712D30D932b71EdB066FA2EEDEE6Ad58","0xE24c9C12373741E9b6beed86D1A067fc5742dC07"]);

    console.log(test);

}

getNativeBalances();