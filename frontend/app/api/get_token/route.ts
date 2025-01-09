import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
export async function GET(req: NextRequest) {
  //   const cookieStore = await cookies();
  // const token = cookieStore.get('accessToken')?.value;
  const token = req.cookies.get("accessToken")?.value;


  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({token: token}); 
}
