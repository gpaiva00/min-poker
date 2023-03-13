import { IUserProps } from '../typings'
import { generateFakeEmail, idGenerator } from '../utils'
import { USER_COLLECTION } from './constants'
import { authenticateAnonymously, db } from './firebase'
import { ICreateUserProps, IUpdateUserProps } from './typings/IUserService'
import { updateUserRoom } from './userRoom'

export const createUserIfNotExist = async ({
  id = idGenerator(),
  name,
  avatarURL,
  email,
}: ICreateUserProps): Promise<IUserProps> => {
  await authenticateAnonymously()
  const userEmail = email || generateFakeEmail(name)

  const { user } = await findUserByEmail(userEmail)
  if (user) return user

  try {
    const user = {
      id,
      name,
      email: userEmail,
      avatarURL,
    }

    await db.collection(USER_COLLECTION).doc(id).set(user)
    return user
  } catch (error) {
    console.error('Error trying to create user', error)
  }
}

export const updateUser = async ({
  name,
  email,
}: IUpdateUserProps): Promise<IUserProps> => {
  try {
    const { user } = await findUserByEmail(email)
    user.name = name

    await db.collection(USER_COLLECTION).doc(user.id).update(user)
    // await updateUserRoom({  })

    return user
  } catch (error) {
    console.error('Error trying to update user', error)
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const userRef = await db
      .collection(USER_COLLECTION)
      .where('email', '==', email)
      .get()

    const user: IUserProps = userRef?.docs?.shift()?.data()
    const userPath = userRef?.docs[0]?.ref?.path

    return { user, userRef, userPath }
  } catch (error) {
    console.error('Cannot find user', error.message)
    throw new Error('Cannot find user.')
  }
}
