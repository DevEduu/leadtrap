
const sendToWebHook = async (name: string, email: string) : Promise<void> => {
    const webhookUrl = "https://n8n.eduudev.tech/webhook-test/eduudev";
    const payload = {
        name, email
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok){
            throw new Error(`Erro ao enviar dados ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Resposta do Webhook", result);

    } catch (error){
        console.error("Erro ao enviar para o webhook:",error);
    }
}