import { Prisma } from "@prisma/client";

export const companyQuery = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: {
    admin: true,
    account: { include: { licence: true, devices: true } },
  },
});