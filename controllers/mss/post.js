import { FILE_PATH } from "../../config.js";

export default async ({ response, request }) => {
    
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    try {
        const { value } = await request.body();

        const { id, grupo, sistema } = await value;

        const data = await Deno.readFile(FILE_PATH);
        const mss = JSON.parse(decoder.decode(data));

        const newSS = { id, grupo, sistema, ultima: null, estado: null, activo: 0 };
        
        mss.push(newSS);

        await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(mss)));

        response.status = 200;
        response.body = { status: 'success', newSS }
    } catch (err) {
        response.status = 502;
        response.body = { status: 'Fallo al crear el Sistema Satelital', err }; 
    }
}