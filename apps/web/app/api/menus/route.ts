import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from '@repo/request/httpStatusCodes';
import { IconName } from 'lucide-react/dynamic';
import { NextResponse } from 'next/server';
import { AppError } from '@/errors';
import { MenusConfigType } from '@/types/menu';
import menusConfig from './menus.yaml';

type SuccessResponse = {
  menus: {
    name: string;
    icon: IconName;
    sub_menus: readonly {
      name: string;
      path: string;
    }[];
  }[];
};

type FailResponse = {
  message: string;
};

type ResponseData = SuccessResponse | FailResponse;

export async function GET(request: Request): Promise<NextResponse<ResponseData>> {
  try {
    const menus = (menusConfig as MenusConfigType).menus;
    return NextResponse.json({ menus });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          error instanceof AppError
            ? error.message
            : HTTP_STATUS_MESSAGES[HTTP_STATUS.INTERNAL_SERVER_ERROR],
        details: error instanceof AppError && error.details ? error.details : null,
      },
      { status: error instanceof AppError ? error.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

const excludedAuthPaths = ['/', '/profile'];
