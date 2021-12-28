declare const CLIENT_ID: string;

export default "https://student.sbhs.net.au/api/authorize?response_type=code" +
               "&scope=all-ro" +
               "&state=abc" +
               `&client_id=${CLIENT_ID}` +
               `&redirect_uri=${location.origin}/callback`;