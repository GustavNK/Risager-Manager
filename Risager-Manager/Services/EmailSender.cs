using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity;
using RisagerManagerServer.Models;
using System.Threading.Tasks;

namespace RisagerManagerServer.Services
{
    public class EmailSender : IEmailSender<User>
    {
        public Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
        {
            throw new NotImplementedException();
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Implement your email sending logic here
            // For example, using SMTP client or an email sending service like SendGrid
            return Task.CompletedTask;
        }

        public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
        {
            throw new NotImplementedException();
        }

        public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
        {
            throw new NotImplementedException();
        }
    }
}
