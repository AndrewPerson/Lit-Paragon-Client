import { Resource } from "./resource";
import { UserInfo } from "schemas/sbhs/user-info";
import { UserInfo as TransformedUserInfo } from "schemas/user-info";

export class UserInfoResource extends Resource<UserInfo, TransformedUserInfo> {
    public readonly name = "userinfo";
    public readonly path = "details/userinfo.json";
    public readonly validator = UserInfo;

    public transform(original: UserInfo): TransformedUserInfo {
        return original;
    }
}
