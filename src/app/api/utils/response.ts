import { NextResponse } from 'next/server'

interface Info {
  msg?: string
  data?: unknown
}

export const response = (success: boolean, statusCode: number, info?: Info) =>
  NextResponse.json({ success, message: info?.msg, data: info?.data }, { status: statusCode })
