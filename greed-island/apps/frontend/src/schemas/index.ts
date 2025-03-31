import z from "zod"

const imageSchema = z
    .custom<FileList>((fileList) => fileList instanceof FileList && fileList.length > 0, {
        message: "File is required",
    })
    .transform((fileList) => fileList.item(0) as File) // Extract the first file
    .refine((file) => file.size < 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
    })
    .refine((file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type), {
        message: "Only PNG, JPEG, and WEBP allowed",
    });


export const propSchema =z.object({
    name : z.string().min(1, {message : "Name cannot be empty"}),
    idleImage : imageSchema,
    idleJson : z.string(),
    runningImage : imageSchema,
    runningJson : z.string()
})

export const elementSchema = z.object({
    name : z.string().min(1, {message : "Name cannot be empty"}),
    image : imageSchema,
    width : z.string(),
    height : z.string(),
    isStatic : z.boolean(),
    jsonData : z.string()
})

export const mapSchema = z.object({
    name : z.string().min(1, {message : "Name cannot be empty"}),
    dimensions : z.string(),
    thumbnail : imageSchema
})

export const spaceSchema = z.object({
    name : z.string().min(1, {message : "Name cannot be empty"}),
    dimensions : z.string(),
    thumbnail : imageSchema,
    mapId : z.string()
})