import React, {useId} from "react";
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"



const RTE = ({ name, control, label, defaultValue = "" }) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1" htmlFor={id} >{label}</label>}
 
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: {onChange} }) => (
                    <Editor
                        apiKey="rssc36np9eu27r7nxzsw0v8x7s5ceyb9gbaokinoahq20w3w"
                        id={id}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: ['anchor', "autolink", 'charmap', 'codesample', 'emoticons', "image", "link", "lists", "media", "searchreplace", "table", "visualblocks", "wordcount", "checklist", "mediaembed", "casechange", "export", "formatpainter", "pageembed", "linkchecker", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "editimage", "advtemplate", "mentions", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss" ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE;