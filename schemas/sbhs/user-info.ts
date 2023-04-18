import { Infer, object, string } from "banditypes";

export const UserInfo = object({
    studentId: string(),
    yearGroup: string()
});

export type UserInfo = Infer<typeof UserInfo>;
