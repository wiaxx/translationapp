import fetch from 'node-fetch';

const getTranslations = async (params, iso) => {

    // https://medium.com/@phamngocmy177/post-a-x-www-form-urlencoded-request-in-react-native-with-fetch-e5253d6072f4
    const formParams = Object.keys(params).map(key => encodeURIComponent('text') + '=' + encodeURIComponent(params[key])).join('&');
    const formBody = formParams + `&target_lang=${iso}`

    const options = {
        method: 'POST',
        headers: {
            "Host": 'api-free.deepl.com',
            "Content-Type": 'application/x-www-form-urlencoded',
            "User-Agent": "http://127.0.0.1:5500",
            "Accept": "*/*",
            // "Authorization": "DeepL-Auth-Key 9dfe0c9b-2103-7712-38cc-e874831df9f0:fx",
            "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_APIKEY,
        },
        body: formBody
    }
    // const uri = `https://api-free.deepl.com/v2/translate`;

    try {
        const response = await fetch(process.env.BASE_URL, options)
        // console.log(response)
        if (response.status === 200) {
            const data = await response.json()
            const translations = data.translations
            console.log('Fetch done!')
            return [translations, response.status];
        } else {
            console.log('Somethings wrong, ', response.status)
            return response.status
        }
        // createNewWB(translations, iso);
    } catch (error) {
        console.log(error)
    }
}

export default getTranslations;