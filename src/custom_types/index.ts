export type myAction<T> = {
    type: string;
    payload: T;
}

export type tagType = {
    value: string;
    title: string;
};

export type fetchedTagsType = {
    success: boolean;
    code: number;
    tags: Array<string>;
};

export type imageType = {
    id: number;
    src: string;
    thumbnail: string;
    tags: Array<tagType>;
    likes: number;
    likedByYou: boolean;
    isSelected: boolean;
    caption: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
};

export type fetchedImagesType = {
    success: boolean;
    code: number;
    images: Array<{
        tags: Array<tagType>;
        likedByYou: boolean;
        path: string;
        name: string;
        id: number;
        likes: number;
    }>;
    pages: number;
};

export type userType = {
    name: string;
    sex: 'male'|'female';
    email: string|null;
    token: string|null;
    avatar: string|null;
};

export type userLoginDataType = {
    userData: {
        real_name: string;
        sex: 'male'|'female';
        default_email: string;
        is_avatar_empty: boolean;
        default_avatar_id: string;
    };
    jwtToken: string;
};

export type filtersType = {
    sortBy: 'id'|'name'|'likes';
    direction: 'asc'|'desc';
    limit: number;
    currentPage: number;
    pages: number;
    tag: string;
};

export type filtersForActionType = {
    sortBy?: 'id'|'name'|'likes';
    direction?: 'asc'|'desc';
    limit?: number;
    currentPage?: number;
    pages?: number;
    tag?: string;
};

export type errorType = {
    isModalOpen: boolean;
    code: string|number|null;
    message: string|null;
};

export type errorForActionType = {
    code: string|number;
    message: string;
};