type UserDetailsProps = {
  name: string;
  id: string;
};
type UserStatus = "normal" | "parent" | "child";
type UserStatusProps = {
  status: UserStatus;
  children?: ReactNode; // Allow children to be passed to the component
};

type WalletAddress = null | number;
type userInfo = {
  account_type: UserStatus;
  total_child_accounts: number;
  total_joined: number;
  total_earned: number;
  total_earned_by_refferal: number;
  wallet_address: WalletAddress;
  current_commission: number;
};

type userBalance = {
  balance: number;
  "Available Balance": number;
};

type role = "user" | "owner";

type userLogin = {
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    is_premium: boolean;
    referral_code: string;
    balance: number;
    roll: null;
  };
  access_token: string;
  expires_in: number;
};
