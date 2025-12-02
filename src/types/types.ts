

export type Repo = {
    id: number;
    name: string;
    full_name?: string;
    description?: string;
    language?: string;
    html_url: string;
    updated_at?: string;
    homepage?: string;
    stargazers_count?: number;
    forks_count?: number;
    watchers_count?: number;
    created_at?: string;
    pushed_at?: string;
    owner?: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    topics?: string[];
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
    name?: string;
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

// Global repository search types
export interface GlobalSearchParams {
    query: string;
    page?: number;
    sort?: "stars" | "forks" | "updated" | "best-match";
    order?: "asc" | "desc";
    language?: string;
    stars?: string;
    created?: string;
    topics?: string;
}

export interface SearchReposResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repo[];
}

export interface GlobalReposFilterProps {
    repos: Repo[];
    totalCount: number;
    currentPage: number;
    searchQuery: string;
}