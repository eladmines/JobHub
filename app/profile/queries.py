UPDATE_USER_DETAILS=""" UPDATE users
    SET firstname=%s, lastname=%s, company=%s, role=%s, experience=%s,skills=%s
    WHERE id=%s"""