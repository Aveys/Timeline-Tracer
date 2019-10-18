import React from 'react';
import { Button } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import log from 'electron-log';

interface FileButtonState {
  textFile: string;
  disabledButtons: boolean;
}

class FileButton extends React.Component<{}, FileButtonState> {
  fileInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      textFile: 'Select JSON archive',
      disabledButtons : false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount(){
    ipcRenderer.on('error-channel', this.handleError)
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('error-channel');
  }

  handleError(event:any, message:string){
    log.info('Errormessage received');
    const form = document.getElementById('file-form') as HTMLFormElement;
    if(form){
      form.reset();
    }
    this.setState(state => ({disabledButtons : false}));
  }
  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      this.fileInput.current !== null &&
      this.fileInput.current.files !== null
    ) {
      this.setState (state =>({disabledButtons : true}));
      const file = this.fileInput.current.files[0];
      ipcRenderer.send('file-load',file.path);
      alert(
        `Selected file - ${this.fileInput.current.files[0].name} - ${file.path}`
      );
    } else {
      console.log('No file selected');
    }
  }

  updateText(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target as any;
    if (target.files !== null) {
      this.setState(state => {
        return {
          textFile: target.files[0].name,
        };
      });
    }
  }

  render(): React.ReactNode {
    return (
      <form id="file-form" onSubmit={this.handleSubmit}>
        <Button className={'btn-file'} variant="info" size="lg" disabled={this.state.disabledButtons}>
          <input type="file" ref={this.fileInput} onChange={this.updateText} accept=".json"/>{' '}
          {this.state.textFile}
        </Button>
        <Button variant="info" size="lg" type={'submit'} disabled={this.state.disabledButtons}>
          Submit
        </Button>
      </form>
    );
  }
}

export default FileButton;
