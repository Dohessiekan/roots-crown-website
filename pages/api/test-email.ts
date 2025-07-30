import { NextApiRequest, NextApiResponse } from 'next'
import { testEmailConfiguration } from '../../lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('Testing email configuration...')
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set')
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'Not set')
    console.log('NEXT_PUBLIC_BUSINESS_EMAIL:', process.env.NEXT_PUBLIC_BUSINESS_EMAIL)

    const result = await testEmailConfiguration()
    
    if (result.success) {
      res.status(200).json({ 
        message: 'Email test successful! ✅', 
        messageId: result.messageId,
        config: {
          emailUser: process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com',
          businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'd.gnondoyi@alustudent.com'
        }
      })
    } else {
      res.status(500).json({ 
        message: 'Email test failed ❌', 
        error: result.error,
        config: {
          emailUser: process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com',
          businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'd.gnondoyi@alustudent.com',
          hasEmailPass: !!process.env.EMAIL_PASS
        }
      })
    }
  } catch (error) {
    console.error('Email test error:', error)
    res.status(500).json({ 
      message: 'Email test failed with exception ❌', 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}
