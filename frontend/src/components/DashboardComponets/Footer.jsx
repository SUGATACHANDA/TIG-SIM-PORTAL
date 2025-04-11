import Separator from "../ui/separator";

const Footer = () => {
    return (
        <>
            <Separator className={"w-4"} />
            <footer className="w-full bg-gray-100 text-gray-400 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Techno India Group. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </>

    );
};

export default Footer;
