import UserDto from "./userDto";

export default interface LoginResponseDto{
    status: string;
    user: UserDto;
}