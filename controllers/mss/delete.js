import { FILE_PATH } from "../../config.js";

export default async ({ response, params }) => {
    
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    try {
        const data = await Deno.readFile(FILE_PATH);
        const mss = JSON.parse(decoder.decode(data));

        const updSS = mss.filter((ss) => ss.id !== params.id);
        await Deno.writeFile(FILE_PATH, encoder.encode(updSS));

        response.status = 200;
        response.body = { status: 'Success', updSS }
    } catch (error) {
        response.status = 502;
        response.body = { status: 'Falló el borrado del Sistema Satelital', error };
    }
}