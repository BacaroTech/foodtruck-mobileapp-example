
export type CategoryView = {
    code: string;
    name: string;
    img: any;
};

export interface BaseDTO {
    id?: number;
    code: string;
    name: string;
}
export interface DayDTO extends BaseDTO { }

export interface CategoryDTO extends BaseDTO { }

export interface TagDTO extends BaseDTO {}
