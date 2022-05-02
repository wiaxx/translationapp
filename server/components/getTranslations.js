const axios = require('axios').default;
const { htmlToText } = require('html-to-text');

module.exports.getTranslations = async (params, iso, records) => {
    let requestStrings = [];
    let responses = [];

    // check if there are more than 50 rows in excel-json
    if (records.length > 50) {
        // loop records and create strings of 50 rows/chunks and push to requestStrings
        for (let i = 0; i < records.length; i += 49) {
            const chunk = records.slice(i, i + 49)
            const formParams = chunk.map(key => encodeURIComponent('text') + '=' + encodeURIComponent(htmlToText(key.Text_SV, { wordwrap: null}))).join('&');
            requestStrings.push(formParams)
        }

        // loop requestString and make seperate request for every index
        for (let i = 0; i < requestStrings.length; i++) {
            const formBody = requestStrings[i] + `&target_lang=${iso}`;

            try {
                const response = await axios.post(process.env.BASE_URL, formBody, {
                    headers: {
                        "Host": 'api-free.deepl.com',
                        "Content-Type": 'application/x-www-form-urlencoded',
                        "User-Agent": "http://127.0.0.1:5500",
                        "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_APIKEY,
                    }
                })

                if (response.status === 200) {
                    const data = await response.data;
                    const translations = data.translations;
                    responses.push(translations);
                    console.log('Fetch done!');
                    // return response.status
                    // return [translations, response.status];
                } else {
                    console.log('Somethings wrong, ', response.status)
                    return response.status;
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (responses.length === requestStrings.length) {
            const translateDone = responses.flat(1);
            return [translateDone, 200]
        }

    } else {
        // https://medium.com/@phamngocmy177/post-a-x-www-form-urlencoded-request-in-react-native-with-fetch-e5253d6072f4
        const formParams = Object.keys(params).map(key => encodeURIComponent('text') + '=' + encodeURIComponent(params[key])).join('&');
        const formBody = formParams + `&target_lang=${iso}`;

        try {
            const response = await axios.post(process.env.BASE_URL, formBody, {
                headers: {
                    "Host": 'api-free.deepl.com',
                    "Content-Type": 'application/x-www-form-urlencoded',
                    "User-Agent": "http://127.0.0.1:5500",
                    "Accept": "*/*",
                    "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_APIKEY,
                }
            })

            if (response.status === 200) {
                const data = await response.data
                const translations = data.translations
                console.log('Fetch done!')
                return [translations, response.status];
            } else {
                console.log('Somethings wrong, ', response.status)
                return response.status;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //when using node fetch
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         "Host": 'api-free.deepl.com',
    //         "Content-Type": 'application/x-www-form-urlencoded',
    //         "User-Agent": "http://127.0.0.1:5500",
    //         "Accept": "*/*",
    //         "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_APIKEY,
    //     },
    //     body: formBody
    // }
    // const uri = `https://api-free.deepl.com/v2/translate`;

    // try {
    //     // const response = await fetch(process.env.BASE_URL, options)
    //     const response = await axios.post(process.env.BASE_URL, formBody, {
    //         headers: {
    //             "Host": 'api-free.deepl.com',
    //             "Content-Type": 'application/x-www-form-urlencoded',
    //             "User-Agent": "http://127.0.0.1:5500",
    //             "Accept": "*/*",
    //             "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_APIKEY,
    //         }
    //     })

    //     if (response.status === 200) {
    //         const data = await response.data //.json()
    //         const translations = data.translations
    //         console.log('Fetch done!')
    //         return [translations, response.status];
    //     } else {
    //         console.log('Somethings wrong, ', response.status)
    //         return response.status;
    //     }
    //     // createNewWB(translations, iso);
    // } catch (error) {
    //     console.log(error);
    // }
}