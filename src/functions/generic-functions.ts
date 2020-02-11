import { print } from 'gluegun'

export const printHelper = (title: string, params: any[]) => {
    const { info, colors } = print;
    info(colors.yellow(title))
    params.forEach((item) => {
        info('  ' + colors.highlight(item.name))
        info('  ' + colors.gray(item.helper))
    })
}
