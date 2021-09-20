import { useAlert } from 'react-alert'
import { useState } from 'react';
import { requestApi } from './../api.js'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button
} from '@mui/material';

export const NewKey = ({ searchResult, setSearchResult, fetchSearchResult }) => {
  const alert = useAlert()
  const [show, setShow] = useState(false)
  const [key, setKey] = useState("")

  const handleSubmit = () => {
    const body = { path_id: searchResult.id, key }
    requestApi('/query_string_keys', 'POST', body).then(r => {
      alert.success('作成しました')
      setKey('')
      setShow(false)
      fetchSearchResult()
    }).catch(r => {
      alert.error(r.error)
    })
  }

  return (
    <Card
      sx={{
        margin: '20px 0',
        background: '#F6FBFF'
      }}
    >
      <CardContent
        {...( !show && {
          onClick: () => setShow(true),
          sx: {
            cursor: 'pointer'
          }
        })}
      >
        {show ? <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px'
            }}
          >
            <TextField
              value={key}
              label='key'
              onChange={e => setKey(e.target.value)}
              sx={{
                margin: 'auto 12px',
              }}
            />
            =
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                margin: 'auto 10px',
                textTransform: 'none'
              }}
            >
              追加
            </Button>
            <Button
              onClick={() => setShow(p => !p)}
              variant="outlined"
              color={'inherit'}
              sx={{
                margin: 'auto 10px',
                textTransform: 'none'
              }}
            >
              閉じる
            </Button>
          </Box>
        </> : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                fontSize: '20px'
              }}
            >
              キーを追加
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}