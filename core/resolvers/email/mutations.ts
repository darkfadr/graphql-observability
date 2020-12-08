import { ApolloContext } from "@core/dataSources";

const sleep = (fn: Function, delay: number) => 
  new Promise((ok, _) => setTimeout(() => ok(fn()), delay));

type RenderArgs = { mjml: string };
interface RenderResolver {
  (email: any, args: RenderArgs, ctx: ApolloContext, info: any): Promise<string>
}
export const render: RenderResolver = 
  async (_email, { mjml }, { dataSources, tracer }, info) => {
    const res = await  dataSources.email.render(mjml);

    const span = tracer.startSpan('mock:sendEmail()', { childOf: info.span });
    await sleep(() => {
      console.log('DEBUG: Facking network operation')
    }, 3000);
    span.finish()

    return res.data?.data;
  };
