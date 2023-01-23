import { FILE_PATH } from "../../config.js";

export default async ({ request, response, params }) => {
        
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    try {
        const { value } = await request.body();

        const id = await value.id;

        const grupo = id.split("_")[0];
        const sistema = id.split("_")[1];

        const formattedNow = currentDate.toLocaleString("default", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short"
        });
    
        const ultima = formattedNow;
        const estado = "ok";
        const activo = 1;

        const data = await Deno.readFile(FILE_PATH);
        const mss = JSON.parse(decoder.decode(data));

        const updSS = mss.map((ss) => {
            if(ss.id === id) {
                return { ...ss, id: params.id, grupo, sistema, ultima, estado, activo }
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