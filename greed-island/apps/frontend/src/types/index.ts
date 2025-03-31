export type AvatarsProps = {     id: string  ,   imageUrl: string ,    name: string, imageUrl2 : string, idleJson : JSON, runningJson : JSON }[]

export type ElementsProps ={ id: string   , name : string,  imageUrl: string   ,  width: number  ,  jsonData : JSON, height: number  ,   static: boolean}[]

export type MapProps = {id : string, name : string}[]

export type MapElementsProps = {Elements: {         imageUrl: string     ,    width: number,         height: number  ,       jsonData: JSON,         name: string  ,       id: string     ,    static: boolean     }  ,   x: number | null   ,  y: number | null, id : string}

export type SpaceProps = {
    width: number,
    height: number ,
    name: string,
    id: string,
    thumbnail: string | null
}[]