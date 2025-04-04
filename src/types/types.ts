

export type Repo = {
    id: number;
    name: string;
    description: string;
    language: string;
    html_url: string;
    updated_at?: string;
    homepage?: string;
};

export type FilterProps = {
    repos: Repo[];
};

export type SearchType = "users" | "repos";


export interface SearchFormProps {
    username: string;
    setUsername: (value: string) => void;
    searchType: SearchType;
    setSearchType: (value: SearchType) => void;
}

export type UserData = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
    bio?: string;
    blog?: string;
    location?: string;
    twitter_username?: string;
    email?: string;
    company?: string;
};


export type User = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
};


export type UserFilterProps = {
    users: UserData[];
};