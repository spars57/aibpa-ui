import { memo, useEffect } from "react"
import Button from "../button"
import useApi, { Endpoint } from "@/hooks/use-api";
import useAuthentication from "@/hooks/use-authentication";

const Sidebar = () => {
    const {accessToken} = useAuthentication();
    console.log(accessToken);
    const { performRequest } = useApi();
    const catchchat = async () => {
        const response = await performRequest(Endpoint.ChatHistory.replace("{userUuid}", "5aa1705b-ff20-4f5f-aee4-203f287002b9") as Endpoint, {method: "GET"}).catch(e => console.error(e))
    };
    useEffect(() => {
        if (accessToken) catchchat();
        }, [accessToken]);
    return(
        <Button color="secondary">
            hello
        </Button>);
}

export default memo(Sidebar);