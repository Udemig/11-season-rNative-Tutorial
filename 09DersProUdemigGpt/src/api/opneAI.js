import axios from "axios";
const {apiKey} = require("../constants")

const client = axios.create({
    headers: {
        Authorization: "Bearer "+ apiKey,
        "Content-Type" : "application/json"
    }
})

const chatGptEndpoint = "https://api.openai.com/v1/responses"

const dalleEndpoint = "https://api.openai.com/v1/images/generations"


const getText = (data) =>{
    return (
        data?.output_text || 
        data?.output
            ?.flatMap(item => item.content || [])
            ?.find(content => content.type == "output_text")
            ?.text
    )
}

export const apiCall = async(prompt, messages = []) =>{
    try {
        const res = await client.post(chatGptEndpoint,{
            model: "gpt-5-mini",
            input:[
                {
                    role: "user",
                    content: `Bu mesaj bir yapa zeka resmi, görseli, sanatı veya benzer bir şey oluşturma istiyor mu? ${prompt}. Sadece evet veya hayır olarak cevap ver.`,

                }
            ]
        })

        let isArt = getText(res.data)?.trim().toLowerCase()
        console.log("isArt: ", isArt)

        if (isArt?.includes("evet")) {
            console.log("dalle api cagir")
            return await dalleApiCall(prompt, messages)
        } else {
            console.log("chatgbt api cagir")
            return await chatgptApiCall(prompt, messages)
        }

    } catch (error) {
        
        console.log("error: ", error.response?.data || error.message)
    }
}

const chatgptApiCall = async (prompt, messages = []) =>{
    try {
        const updatedMessages = [
            ...messages
        ]

        const res = await client.post(chatGptEndpoint,{
            model: "gpt-4.1-mini",
            input: updatedMessages
        })

        const answer = res.data?.output_text || res.data?.output?.[0]?.content?.[0]?.text || res.data?.choices?.[0]?.message?.content

        if (!answer){
            return{
                success: false,
                msg: "cevap alinamadi"
            }
        }

        updatedMessages.push({
            role: "assistant",
            content: answer.trim()
        })

        return {
            success: true,
            data: updatedMessages
        }
    } catch (error) {

        console.log("hata", error.response?.data || error.message)
        
        return{
            success: false,
            msg: error.response?.data?.message || error.message
        }
    }
}


const dalleApiCall = async (prompt, messages = []) =>{
    try {
        
        const res = await client.post(dalleEndpoint,{
            model: "gpt-image-1",
            prompt,
            n:1,
            size: "1024x1024"
        })


       const imageBase64 = res?.data?.data?.[0]?.b64_json

       if (!imageBase64) {
            return {
                success: false,
                msg: "gorsel alinamadi"
            }
       }

       console.log("resim icin alinan url: ", imageBase64)

       const imageUri = `data:image/png;base64,${imageBase64}`

       console.log("imageUri base64 olarak alindi: ", imageUri)

       messages.push({
        role: "assistant",
        content: imageUri
       })

       return {
        success: true,
        data: messages
       }
    } catch (error) {
        console.log("error: ", error.response?.data || error.message)

        return{
            success: false,
            msg: error.response?.data?.error?.message || error.me
        }
    }
}