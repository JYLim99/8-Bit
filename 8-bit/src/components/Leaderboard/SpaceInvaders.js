/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../../config/firebase'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import './Leaderboards.module.css'

const useStyles = makeStyles({
  container: {
    maxWidth: 650,
    padding: 10,
    margin: 30,
  },
  table: {
    minWidth: 650,
  },
  tablehead: {
    fontFamily: 'Caramel Sweets',
    fontSize: 25,
  },

  tablebody: {
    fontFamily: 'Caramel Sweets',
  },
})
function SpaceInvaders() {
  const classes = useStyles()
  const [scores, setScores] = useState([])
  const fetchScores = async () => {
    const response = db.collection('spaceInvadersScores')

    const data = await response.orderBy('score', 'desc').limit(3).get()

    data.docs.forEach((item) => {
      console.log(item.id, '=> ', item.data())
      setScores([...scores, item.data()])
      scores.push(item.data())
    })
  }

  console.log(scores)

  useEffect(() => {
    fetchScores()
  }, [])

  console.log(scores)
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.table}
          aria-label='Space Invaders Leaderboard'
        >
          <TableHead className={classes.tablehead}>
            Space Invaders Leaderboard
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tablebody} width='10%'>
                Index
              </TableCell>
              <TableCell className={classes.tablebody} width='50%'>
                Player
              </TableCell>
              <TableCell
                className={classes.tablebody}
                width='40%'
                align='right'
              >
                Score
              </TableCell>
            </TableRow>
            {scores.map((record, index) => (
              <TableRow key={record.name}>
                <TableCell className={classes.tablebody}>{index + 1}</TableCell>
                <TableCell
                  className={classes.tablebody}
                  component='th'
                  scope='record'
                >
                  {record.name}
                </TableCell>
                <TableCell className={classes.tablebody} align='right'>
                  {record.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SpaceInvaders

/*<div className={styles.SpaceInvaders}>
        <h2>SpaceInvaders Leaderboard</h2>
        {scores &&
          scores.map((record) => {
            return (
              <div className={styles.scoreContainer}>
                <h4>{record.name}</h4>
                <p>{record.score}</p>
              </div>
            )
          })}
      </div>*/
