import { useEffect, useState } from "react"
import styled, { css, keyframes } from 'styled-components'
import axios from 'axios'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates';
import moment, { Moment } from "moment";
import { serverURL } from 'config';
import { toast } from 'react-toastify';

const ModalSteps = ({ formStage, setFormStage }: {
  formStage: number,
  setFormStage: (v: number) => void
}) => {
  const [userName, setUserName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [discordLink, setDiscordLink] = useState('')
  const [nftsCount, setNFTsCount] = useState('')
  const [drop, setDrop] = useState('')
  const [date, setDate] = useState<Moment | null>(moment())
  const [projectId, setProjectId] = useState(null)
  const [back, setBack] = useState(false)

  const [openCalendar, setOpenCalendar] = useState(false)

  const saveData = () => {
    axios({
      url: `${serverURL}/project`,
      method: 'POST',
      data: {
        projectId,
        date,
        userName,
        email,
        projectName,
        twitterHandle, 
        nftsCount,
        drop,
        discord: discordLink,
        website
      }
    }).then(res => {
      setProjectId(res.data._id)
      setFormStage(10)
    }).catch(() => {
      toast.error('Error! Please try again later!')
    })
  }

  const handleUpload = (event: any) => {

    Array.from(event.target.files)?.forEach((f: any) => {
      if (f.size < 10000000) {
        axios.post(`${serverURL}/uploadfiles/${projectId}`, {
          name: f.name,
          type: f.type
        })
          .then(({data}: any) => {
            axios.put(data.url, f, {
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(() => {
              toast.success('Sample was uploaded successfully!')
            })
          }).catch(() => {
            toast.error('Ah! There is an error, please try again.')
          })
      } else {
        toast.error('One of the files is bigger than 10MB!')
      }
    })
  }
  if (formStage > 10) {
    return null
  }

  return (
    <>
      <Modal enterAnimation={!back && formStage === 1} closeAnimation={!back && formStage === 2} backAnimation={back && formStage === 1}>
        <ModalWrapper>
          <FormTitle>1. Your name *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={userName} onChange={e => setUserName(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && userName) {
                setBack(false)
                setFormStage(2)
              }
            }} />
          </div>
          <div>
            <OkButton disabled={!userName} onClick={() => {
              if (userName) {
                setBack(false)
                setFormStage(2)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
        </ModalWrapper>
      </Modal>
      <Modal enterAnimation={!back && formStage === 2} closeAnimation={!back && formStage === 3} backAnimation={back && formStage === 2} closeBackAnimation={back && formStage === 1}>
        <ModalWrapper>
          <FormTitle>2. Your project name *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={projectName} onChange={e => setProjectName(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && projectName) {
                setBack(false)
                setFormStage(3)
              }
            }}/>
          </div>
          <div>
            <OkButton disabled={!projectName} onClick={() => {
              if (projectName) {
                setBack(false)
                setFormStage(3)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(1)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal enterAnimation={!back && formStage === 3} closeAnimation={!back && formStage === 4} backAnimation={back && formStage === 3} closeBackAnimation={back && formStage === 2} >
        <ModalWrapper>
          <FormTitle>3. Your e-mail address *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={email} onChange={e => setEmail(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setBack(false)
                setFormStage(4)
              }
            }}/>
          </div>
          <div>
            <OkButton disabled={!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)} onClick={() => {
              if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setBack(false)
                setFormStage(4)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(2)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal enterAnimation={!back && formStage === 4} closeAnimation={!back && formStage === 5} backAnimation={back && formStage === 4} closeBackAnimation={back && formStage === 3} >
        <ModalWrapper>
          <FormTitle>4. Your website, if you have one</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={website} onChange={e => setWebsite(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter') {
                setBack(false)
                setFormStage(5)
              }
            }}/>
          </div>
          <div>
            <OkButton onClick={() => {
              setBack(false)
              setFormStage(5)
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(3)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal  enterAnimation={!back && formStage === 5} closeAnimation={!back && formStage === 6} backAnimation={back && formStage === 5} closeBackAnimation={back && formStage === 4} >
        <ModalWrapper>
          <FormTitle>5. Your twitter handle *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && twitterHandle) {
                setBack(false)
                setFormStage(6)
              }
            }}/>
          </div>
          <div>
            <OkButton disabled={!twitterHandle} onClick={() => {
              if (twitterHandle) {
                setBack(false)
                setFormStage(6)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(4)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal enterAnimation={!back && formStage === 6} closeAnimation={!back && formStage === 7} backAnimation={back && formStage === 6} closeBackAnimation={back && formStage === 5} >
        <ModalWrapper>
          <FormTitle>6. Please share the link to your Discord</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={discordLink} onChange={e => setDiscordLink(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter') {
                setBack(false)
                setFormStage(7)
              }
            }}/>
          </div>
          <div>
            <OkButton onClick={() => {
              setBack(false)
              setFormStage(7)
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(5)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal  enterAnimation={!back && formStage === 7} closeAnimation={!back && formStage === 8} backAnimation={back && formStage === 7} closeBackAnimation={back && formStage === 6} >
        <ModalWrapper>
          <FormTitle>7. How many NFTs are in your collection? *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={nftsCount} onChange={e => setNFTsCount(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && nftsCount) {
                setBack(false)
                setFormStage(8)
              }
            }}/>
          </div>
          <div>
            <OkButton disabled={!nftsCount} onClick={() => {
              if (nftsCount) {
                setBack(false)
                setFormStage(8)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(6)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal enterAnimation={!back && formStage === 8} closeAnimation={!back && formStage === 9} backAnimation={back && formStage === 8} closeBackAnimation={back && formStage === 7} >
        <ModalWrapper>
          <FormTitle>8. Do you plan on multiple or a single drop? *</FormTitle>
          <div>
            <FormInput placeholder="Type here..." value={drop} onChange={e => setDrop(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && drop) {
                setBack(false)
                setFormStage(9)
              }
            }}/>
          </div>
          <div>
            <OkButton disabled={!drop} onClick={() => {
              if (drop) {
                setBack(false)
                setFormStage(9)
              }
            }}>OK <img src="/images/check.png" /></OkButton>
            <Enter>Press <strong>ENTER</strong> <img src="/images/enter.png" /></Enter>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(7)
          }} />
        </ModalWrapper>
      </Modal>
      <Modal  enterAnimation={!back && formStage === 9} closeAnimation={!back && formStage === 10} backAnimation={back && formStage === 9} closeBackAnimation={back && formStage === 8} >
        <ModalWrapper>
          <FormTitle>9. When do you plan to launch? *</FormTitle>
          <div>
            {/* <FormInput value={drop} onChange={e => setDrop(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && drop) {
                setFormStage(9)
              }
            }}/> */}
            <SingleDatePicker 
              id="date_input"
              date={date}
              focused={openCalendar}
              numberOfMonths={1}
              onFocusChange={() => {
                setOpenCalendar(!openCalendar)
              }}
              onDateChange={(date: Moment | null) => {
                setDate(date);
              }}
            />
          </div>
          <div>
            <DateContainer onClick={() => {
              setOpenCalendar(!openCalendar)
            }}>
              <DateCell>
                <DateLabel>Month</DateLabel>
                <DateValue>{date?.format('MM')}</DateValue>
              </DateCell>
              <DateCell>
                <DateValue>/</DateValue>
              </DateCell>
              <DateCell>
                <DateLabel>Day</DateLabel>
                <DateValue>{date?.format('DD')}</DateValue>
              </DateCell>
              <DateCell>
                <DateValue>/</DateValue>
              </DateCell>
              <DateCell>
                <DateLabel>Year</DateLabel>
                <DateValue centerAlign>{date?.format('YYYY')}</DateValue>
              </DateCell>
            </DateContainer>
            <DateOkButton disabled={!date} onClick={() => {
              if (date) {
                setBack(false)
                saveData()
              }
            }}>OK <img src="/images/check.png" /></DateOkButton>
          </div>
          <BackIcon src='/images/back.png' onClick={() => {
            setBack(true)
            setFormStage(8)
          }} />
        </ModalWrapper>
      </Modal>
      <SquareModal enterAnimation={!back && formStage === 10} closeBackAnimation={back && formStage === 9}>
        <ModalWrapper>
          <LabelInput htmlFor="files"></LabelInput>
          <FileInput id="files" type="file" multiple name="samples" onChange={handleUpload} />
          <SamplesTitle>Please upload a few samples of your artwork.</SamplesTitle>
          <div>
            <UploadImage src="/images/upload.png" />
          </div>
          <div>
            <WhiteLabels>Choose file</WhiteLabels>
            <WhiteLabels>Size limit: 10 MB</WhiteLabels>
          </div>
          <SamplesBackIcon src='/images/white-arrow.png' onClick={() => {
            setBack(true)
            setFormStage(9)
          }} />
          <SampleOkButton onClick={() => {
            setFormStage(11)
          }}>OK <img src="/images/check.png" /></SampleOkButton>
        </ModalWrapper>
      </SquareModal>
    </>
  )
}

const FormTitle = styled.p`
  font-size: 24px;
  font-family: 'Jost Bold';
  margin-bottom: 10px;
  margin-top: 8px;
`

const SamplesTitle = styled.p`
  font-size: 18px;
  font-family: 'Jost Bold';
  margin-bottom: 10px;
  margin-top: 8px;
  color: #fff;
`

const FormInput = styled.input`
  border: 0;
  border-bottom: 2px solid #000;
  width: 100%;
  outline: none;
  background: transparent;
  font-family: 'Jost Regular';
  font-size: 16px;
  margin-bottom: 20px;
`

const OkButton = styled.button`
  background: #2190FF;
  border-radius: 12px;
  border: 0;
  color: #fff;
  width: 130px;
  padding: 5px;
  text-align: center;
  font-size: 21px;
  font-family: 'Jost Semibold';
  vertical-align: middle;
  cursor: pointer;

  &:disabled {
    background: #ccc;
  }

  img {
    width: 22px;
    margin-top: -4px;
    margin-left: 10px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 40px;
  }
`

const DateOkButton = styled(OkButton)`
  @media screen and (max-width: 768px) and (min-width: 542px) {
    margin-top: -30px;
  }
`

const SampleOkButton = styled(OkButton)`
  position: absolute;
  bottom: -57px;
  left: calc(100% - 175px);


  @media screen and (max-width: 768px) {
    margin-left: 5px;
  }
`

const Enter = styled.span`
  font-size: 18px;
  vertical-align: middle;
  margin-left: 20px;
  font-family: 'Jost Regular';

  strong {
    font-family: 'Jost Bold';
  }

  img {
    width: 24px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
`

const BackIcon = styled.img`
  width: 15px;
  position: absolute;
  left: -40px;
  bottom: 32px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    left: 0;
    bottom: 10px;
  }
`

const SamplesBackIcon = styled(BackIcon)`
  width: 15px;
  position: absolute;
  left: calc(100% - 200px);
  bottom: -50px;
  cursor: pointer;
`
const enterAnimation = keyframes`
  0% {
    top: 100%;
    opacity: 0;
  }
  100% {
    top: calc(50% - 100px);
    opacity: 1;
  }
`;
const enterSquareAnimation = keyframes`
  0% {
    top: 100%;
    opacity: 0;
  }
  100% {
    top: calc(50% - 150px);
    opacity: 1;
  }
`;
const closeAnimation = keyframes`
  0% {
    top: calc(50% - 100px);
    opacity: 1;
  }
  100% {
    top: -20%;
    opacity: 0;
  }
`;
const backAnimation = keyframes`
  0% {
    top: -20%;
    opacity: 0;
  }
  100% {
    top: calc(50% - 100px);
    opacity: 1;
  }
`;
const closeBackAnimation = keyframes`
  0% {
    top: calc(50% - 100px);
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
`;
const closeBackSquareAnimation = keyframes`
  0% {
    top: calc(50% - 150px);
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
`;

const Modal = styled.div`
  position: absolute;
  left: calc(50% - 350px);
  display: inline-block;
  width: 700px;
  height: 200px;
  background: #ffffffdd;
  border-radius: 30px;
  text-align: left;
  padding: 20px 80px;
  top: 100%;
  opacity: 0;

  ${(props: {enterAnimation?: boolean, closeAnimation?: boolean, backAnimation?: boolean, closeBackAnimation?: boolean}) => props.enterAnimation && css`
    animation: 1s ${enterAnimation} forwards;
  `}

  ${(props: {enterAnimation?: boolean, closeAnimation?: boolean, backAnimation?: boolean, closeBackAnimation?: boolean}) => props.closeAnimation && css`
    animation: 1s ${closeAnimation} forwards;
  `}
  ${(props: {enterAnimation?: boolean, closeAnimation?: boolean, backAnimation?: boolean, closeBackAnimation?: boolean}) => props.backAnimation && css`
    animation: 1s ${backAnimation} forwards;
  `}
  ${(props: {enterAnimation?: boolean, closeAnimation?: boolean, backAnimation?: boolean, closeBackAnimation?: boolean}) => props.closeBackAnimation && css`
    animation: 1s ${closeBackAnimation} forwards;
  `}

  @media screen and (max-width: 768px) {
    width: 96%;
    left: 2%;
    padding: 20px;
    height: auto;
  }
`

const SquareModal = styled.div`
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  display: inline-block;
  width: 300px;
  height: 300px;
  background: #3B85BC88;
  backdrop-filter: blur(10px);
  border-radius: 30px;
  text-align: center;
  padding: 20px;
  top: 100%;
  opacity: 0;

  ${(props: {enterAnimation?: boolean, closeBackAnimation?: boolean}) => props.enterAnimation && css`
    animation: 1s ${enterSquareAnimation} forwards;
  `}

  ${(props: {enterAnimation?: boolean, closeBackAnimation?: boolean}) => props.closeBackAnimation && css`
    animation: 1s ${closeBackSquareAnimation} forwards;
  `}
`

const DateContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 300px;
  padding-left: 20px;
  margin-right: 10px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) and (min-width: 542px) {
    padding-left: 40px;
  }

`

const DateCell = styled.div`
  display: inline-block;
  vertical-align: bottom;
  width: 20%;
`

const DateLabel = styled.div`
  font-size: 14px;
  font-family: 'Jost Regular';
`

const DateValue = styled.div`
  font-size: 18px;
  font-family: 'Jost Semibold';
  ${(props: { centerAlign?: boolean }) => props.centerAlign && css`
    margin-left: -18px;
  `}
`

const LabelInput = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`

const FileInput = styled.input`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const UploadImage = styled.img`
  width: 100px;
  margin-top: 22px;
  margin-bottom: 8px;
`

const WhiteLabels = styled.div`
  color: #fff;
  font-family: 'Jost Semibold';
`

export default ModalSteps