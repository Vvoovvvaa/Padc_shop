import * as fs from "fs"
import * as path from 'path'

export class FileHelper{
    static savefile(folder:string,files: Express.Multer.File): string{
        const direcoty = process.cwd() + '/uploads' + `/${folder}`
        if(!fs.existsSync(direcoty)){
                fs.mkdirSync(direcoty)
            }
        const fullpath = path.join(direcoty,files.originalname)
        fs.writeFileSync(fullpath,files.buffer)

        return `uploads/${folder}/${files.originalname}`
        }
}

    
