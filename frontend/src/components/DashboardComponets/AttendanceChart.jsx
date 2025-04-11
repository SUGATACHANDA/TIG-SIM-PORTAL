// import { TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card"

const data = [
    { month: "1", Attendance: 186 },
    { month: "2", Attendance: 305 },
    { month: "3", Attendance: 237 },
    { month: "4", Attendance: 73 },
    { month: "5", Attendance: 209 },
    { month: "6", Attendance: 214 },
    { month: "7", Attendance: 214 },
    { month: "8", Attendance: 214 },
    { month: "9", Attendance: 214 },
    { month: "10", Attendance: 214 },
    { month: "11", Attendance: 214 },
    { month: "12", Attendance: 214 },
    { month: "13", Attendance: 214 },
    { month: "14", Attendance: 214 },
    { month: "15", Attendance: 214 },
    { month: "16", Attendance: 214 },
    { month: "17", Attendance: 214 },
    { month: "18", Attendance: 214 },
    { month: "19", Attendance: 214 },
    { month: "20", Attendance: 214 },
    { month: "21", Attendance: 214 },
    { month: "22", Attendance: 214 },
    { month: "23", Attendance: 214 },
    { month: "24", Attendance: 214 },
    { month: "25", Attendance: 104 },
    { month: "26", Attendance: 88 },
    { month: "27", Attendance: 284 },
    { month: "28", Attendance: 214 },
    { month: "29", Attendance: 202 },
    { month: "30", Attendance: 180 },
]

const AttendanceChart = () => {
    return (
        <Card className="max-w-full">
            <CardHeader>
                <CardTitle className="text-base">Attendance Chart</CardTitle>
                <CardDescription className="text-xs">April 2025</CardDescription>
            </CardHeader>

            <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="Attendance" fill="#dc2626" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-1 text-xs">
                {/* <div className="flex items-center gap-1 font-medium">
                    Trending up 5.2% <TrendingUp className="h-3 w-3" />
                </div>
                <div className="text-muted-foreground">
                    Last 6 months visitors data
                </div> */}
            </CardFooter>
        </Card>
    )
}

export default AttendanceChart
