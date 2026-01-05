export class Env{
    public static readonly BASE_URL:string=process.env.Base_URL??"https://stage.tombola.co.uk/userauthenticationids/loginsso#/login";
    public static readonly USERNAME:string=process.env.Username??"techtest1";
    public static readonly PASSWORD:string=process.env.Password??"TechTest1!";
    public static readonly HOME_PAGE_TITLE: "tombola - britain's biggest bingo site";
    public static readonly LOGIN_PAGE_TITLE: "tombola - log in to play";
    public static readonly WINNERS_PAGE_TITLE: "Meet our online bingo winners | tombola";
    public static readonly MYACCOUNT_PAGE_TITLE: "Welcome to My Account";
    public static readonly DEPOSIT_BALANCE_LIMIT_TITLE: "Deposit Balance Limit";
}