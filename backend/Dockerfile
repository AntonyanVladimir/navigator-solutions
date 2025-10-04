# syntax=docker/dockerfile:1.6

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS deps
WORKDIR /src
COPY TechConsult.Api.csproj ./
RUN dotnet restore TechConsult.Api.csproj

FROM deps AS dev
COPY . .
ENV ASPNETCORE_URLS=http://+:8080
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:8080"]

FROM deps AS build
COPY . .
RUN dotnet publish TechConsult.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS prod
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "TechConsult.Api.dll"]
