using System;
using System.Collections.Generic;

namespace ReactWeb2.Models
{
    public partial class OfficeAssignment
    {
        public int InstructorId { get; set; }
        public string Location { get; set; }
        public byte[] Timestamp { get; set; }

        public Person Instructor { get; set; }
    }
}
