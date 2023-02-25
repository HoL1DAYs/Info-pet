
export interface ResponseDataModel{
    content: [{
        breed: string;
        animalType:string;
        id: string;
        care: string;
        character: string;
        subtitle: string;
        thumbnail_url: string;
        training: string;
        parameters: [];
        filters: [];
        diet?: string;
        breedGallery?: string;
    }];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: string;
    numberOfElements: string;
    size: string;
    totalElements: string;
    totalPages: string;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    pageable: {
        offset: string;
        pageNumber: string;
        pageSize: string;
        paged: boolean;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }
        unpaged: boolean;
    };

}