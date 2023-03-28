import { message } from 'antd'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
import { uploadPdf } from '../api/studentApi/report'

export default function usePdf () {
  const printPDF = (
    elementId: string,
    hiddenId: string | undefined,
    hiddenClass: string | undefined,
    pdfName: string
  ) => {
    const domElement = document.getElementById(elementId)!
    html2canvas(domElement, {
      scale: 2,
      onclone: (document) => {
        if (hiddenId) {
          document.getElementById(hiddenId)!.style.visibility = 'hidden'
        }
        if (hiddenClass) {
          document.querySelectorAll(hiddenClass).forEach(element => {
            (element as HTMLElement).style.visibility = 'hidden'
          })
        }
      }
    })
      .then((canvas) => {
        const pageWidth = 841.89
        const pageHeight = 592.28
        // 要打印内容，转换成 canvas 图片后的宽高尺寸
        const contentWidth = canvas.width * 3 / 4
        const contentHeight = canvas.height * 3 / 4

        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片宽
        const imgWidth = pageWidth
        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片高
        const imgHeight = pageWidth / contentWidth * contentHeight

        // 起始内容截取位置
        let position = 0
        // 剩余未打印内容的高度
        let leftHeight = imgHeight
        const img = canvas.toDataURL('image/png')
        // eslint-disable-next-line new-cap
        const pdf = new jsPdf('landscape', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(img, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= pageHeight
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(pdfName + '.pdf')
        message.success({ content: '导出成功', key: 'pdf' })
      })
  }

  const uploadFile = (
    elementId: string,
    hiddenId: string | undefined,
    hiddenClass: string | undefined,
    reportId: string,
    pdfName: string
  ) => {
    const domElement = document.getElementById(elementId)!
    html2canvas(domElement, {
      scale: 2,
      onclone: (document) => {
        if (hiddenId) {
          document.getElementById(hiddenId)!.style.visibility = 'hidden'
        }
        if (hiddenClass) {
          document.querySelectorAll(hiddenClass).forEach(element => {
            (element as HTMLElement).style.visibility = 'hidden'
          })
        }
      }
    })
      .then(async (canvas) => {
        const pageWidth = 841.89
        const pageHeight = 592.28
        // 要打印内容，转换成 canvas 图片后的宽高尺寸
        const contentWidth = canvas.width * 3 / 4
        const contentHeight = canvas.height * 3 / 4

        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片宽
        const imgWidth = pageWidth
        // 将要打印内容的图片，等比例缩放至宽度等于输出时 PDF 每页的宽度，此时的图片高
        const imgHeight = pageWidth / contentWidth * contentHeight

        // 起始内容截取位置
        let position = 0
        // 剩余未打印内容的高度
        let leftHeight = imgHeight
        const img = canvas.toDataURL('image/png')
        // eslint-disable-next-line new-cap
        const pdf = new jsPdf('landscape', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(img, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= pageHeight
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        const formDate = new FormData()
        const blob = pdf.output('blob')
        const file = new File([blob], pdfName + '.pdf', { type: blob.type })
        formDate.append('file', file)
        const res = await uploadPdf(reportId, formDate)
        if (res?.success) {
          message.success(res.msg)
        }
      })
  }

  return {
    printPDF,
    uploadFile
  }
}
