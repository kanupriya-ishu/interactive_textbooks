import React, { useContext, useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

export default class Editor extends React.Component {
    onEditorChange;
    defaultContent;
    constructor (props) {
      super(props)
      this.state = { editorHtml: props.defaultContent,
                     lesson_body:''}
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange (html) {
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    }
    
    render () {
      return (
        <div>
          <ReactQuill 
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={modules}
            formats={formats}
           />
         </div>
       )
    }
  }

  function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
  
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    // Called on hide and save.
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Embed URL';
  }

  const modules = {
    toolbar: {
        container: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            [{ 'color': [] }, { 'background': [] }], 
            ['clean'],
            [{ 'align': [] }]
        ],
        handlers: {
            image: imageHandler
        },
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
    }
  };
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color'
  ]