import Image from 'next/image';


export default function Background(){
    return (
        <Image alt="background"
        src='/images/paperbackground.jpg'
        sizes="100vw"
        width="100"
        height="100"/>
    )
}