import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'


export async function GET(request , {params}){
    console.log(params.id) //el id es un string


    const task = await prisma.task.findUnique({
        where : {
            id: Number( params.id )
        }
    })
    console.log(task)
    return NextResponse.json(task)

}

export async function PUT(request , {params}){
    const data = await request.json()
    const taskUpdated =  await prisma.task.update({
        where : {
            id: Number(params.id)
        }, 
        //usamos data porque todo el json que se encuentra en insomia es igual 
        // lo bueno que en insomnia puedo enviar solo uno si deseo , title o description
        data:data
    })
    return NextResponse.json(taskUpdated)
}
export async function DELETE(request , {params}){

    try {
        const taskRemoved = await prisma.task.delete({
            where : {
                id: Number(params.id)
            }
        })
        console.log(taskRemoved)
        return NextResponse.json(taskRemoved)
    } catch (error) {
        return NextResponse.json(error.message)
    }

}