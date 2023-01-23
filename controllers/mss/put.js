import { FILE_PATH } from "../../config.js";

export default async ({ request, response, params }) => {
        
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    try {
        const { value } = await request.body();

        const { id, grupo, sistema, ultima, estado, activo } = await value;

        const data = await Deno.readFile(FILE_PATH);
        const mss = JSON.parse(decoder.decode(data));

        const updSS = mss.map((ss) => {
            if(ss.id === params.id) {
                return { ...ss, id: params.id, grupo: params.grupo, sistema: params.sistema, ultima: params.ultima, estado: params.estado, activo: params.activo }
            }
            return ss;
        });

        await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updSS)));

        response.status = 204;
        response.body = { status: 'success', data: updSS }

    } catch (error) {   
        response.status = 502;
        response.body = { status: 'Fallo al acutalizar el Sistema Satelital', error }
    }
}
