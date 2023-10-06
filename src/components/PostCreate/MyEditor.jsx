import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function MyEditor({ handleChange, data, modules, readOnly }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          loader.file.then((file) => {
            reader.onload = () => {
              // Đọc tệp ảnh và chuyển thành dạng dữ liệu base64
              const imageData = reader.result.split(",")[1];
              // Tạo một URL base64 giả lập cho mục đích minh họa
              const uploadedImageUrl = `data:image/jpeg;base64,${imageData}`;
              // Trả về URL của ảnh để hiển thị trong CKEditor
              resolve({ default: uploadedImageUrl });
            };
            reader.readAsDataURL(file);
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      data={data}
      config={
        modules
          ? {
              toolbar: {
                items: [
                  "alignment",
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "outdent",
                  "indent",
                  "|",
                  "imageUpload",
                  "blockQuote",
                  "insertTable",
                ],
              },
              extraPlugins: [uploadPlugin],
              image: {
                upload: {
                  types: ["jpeg", "png"],
                },
              },
            }
          : { toolbar: [] }
      }
      disabled={readOnly}
      editor={ClassicEditor}
      onChange={(e, editor) => {
        handleChange(editor.getData());
      }}
    />
  );
}
